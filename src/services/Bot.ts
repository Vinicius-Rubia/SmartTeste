import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import store from "../redux/store";
import { openNotification } from "../utils/notification";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const url = "https://api.openai.com/v1/chat/";

const configuration = new Configuration({
  organization: "org-VEXXpgull6PiJcIc5djUQEzL",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

async function setDeal(dealId: number) {
  try {
    const response = await axios.post(`https://localhost:7297/api/Deals/setDeal?dealId=${dealId}&isPaid=true`);

    console.log(response.data);

    const message = `Fatura paga com sucesso! Aguarde até 3 dias úteis para cair seu pagamento em nosso sistema. Muito obrigado em escolher os serviços da SmartWays`;

    return message;
  } catch (err) {
    return "Houve um problema em realizar o pagamento. Tente novamente mais tarde."
  }
}

async function getDebts(customerId: string) {
  try {
    const response = await axios.get(`https://localhost:7297/api/Debts/getDebts?customerId=${customerId}`);
    const debts = response.data;

    openNotification({position: "top", type: "info", title: "Result: Get Debts", description: debts});

    let argumentsObj = JSON.stringify(debts);
    const message = `Apresente essas faturas ${argumentsObj} ao cliente uma por uma de maneira clara, simpática e amigável, e no fim apresente um resumo com o valor valor total(use a propriedade value) que o cliente vai pagar somando as faturas calculando os descontos. Exemplo: ID da Fatura: ${debts[0].dealId}. O valor dessa fatura é: R$${debts[0].value},00 e você tem um desconto de: R$${debts[0].discount},00 reais. No ID da Fatura mostre o valor do dealId e não mostre ao cliente o customerId, o paymentId e nem o isPaid.`;
    return message;
  } catch (err) {
    return "Houve um problema em consultar suas faturas. Tente novamente mais tarde."
  }
}

export const post = async (path: string) => {
  const messagesRedux = store.getState().chat.messages.filter((item) => item.message);
  const context = store.getState().chat.context;

  const allMessageIA = messagesRedux.reduce((acumulador, item) => {
    if (item.author === 'IA') {
      acumulador += item.message + '\n';
    }
    return acumulador;
  }, '');

  const allMessageUser = messagesRedux.reduce((acumulador, item) => {
    if (item.author === 'user') {
      acumulador += item.message + '\n';
    }
    return acumulador;
  }, '');

  let messages: any = [
    {
      role: "system",
      content: context,
    },
    { role: "user", content: allMessageUser },
    { role: "assistant", content: allMessageIA },
  ]
  
  let chat = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    functions: [
      {
        name: "getDebts",
        description: "Trás as faturas do cliente somente quanto existe um CPF que é passado como parâmetro.",
        parameters: {
          type: "object",
          properties: {
            customerId: {
              tpye: "string",
              description: "Seguência de 11 caracteres númericos que é o CPF do cliente para conseguir pegar os dados das faturas do cliente",
            }
          },
          require: ["customerId"],
        },
      },
      {
        name: "setDeal",
        description: "Realiza o pagamento da fatura do cliente de acordo com o dealId passado como parâmetro.",
        parameters: {
          type: "object",
          properties: {
            dealId: {
              tpye: "number",
              description: "dealId é um number que serve de parâmetro para a função conseguir realizar o pagamento da fatura do cliente",
            }
          },
          require: ["dealId"],
        },
      },
    ],
    function_call: "auto",
  });

  let wantsToUseFunction = chat.data.choices[0].finish_reason === "function_call";
  let content = "";

  if (wantsToUseFunction) {
    if (chat.data.choices[0].message?.function_call?.name === "getDebts") {
      let argumentsObj = JSON.parse(chat.data.choices[0].message!.function_call!.arguments!);
      content = await getDebts(argumentsObj.customerId).then((data) => JSON.stringify(data));
      messages.push(chat.data.choices[0].message);
      messages.push({
        role: "function",
        name: "getDebts",
        content,
      });
    }

    if (chat.data.choices[0].message?.function_call?.name === "setDeal") {
      let argumentsObj = JSON.parse(chat.data.choices[0].message!.function_call!.arguments!);
      content = await setDeal(argumentsObj.customerId);
      messages.push(chat.data.choices[0].message);
      messages.push({
        role: "function",
        name: "setDeal",
        content,
      });
    }
  }

  try {
    const resp = await axios.post(url + path, { 
      messages,
      model: "gpt-3.5-turbo",
      max_tokens: 500,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return resp.data;
  } catch (e: any) {
    console.log("Houve um erro ao realizar a requisição POST", e);
  }
};

export const Bot = {
  post,
};