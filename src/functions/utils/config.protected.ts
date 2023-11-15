export const defaultQueue = {
  queueName: "Everyone",
};

export const OtherQueues = [
  {
    queueName: "Sales",
    description:
      "Use this queue when the customer wants to talk about invoices, contracts, discounts, payments, and everything related to Selling Insurance Policies",
  },
  {
    queueName: "Customer Service",
    description:
      "Use this queue when the customer is having technical issues accessing or using our website. Basically, if the customer is not talking about Sales or Claims, this is the queue to send the customer to.",
  },
  {
    queueName: "Claims",
    description:
      "Use this queue when the customer had an accident with his vehicle and wants to create a claim to fix it.",
  },
  {
    queueName: "Claims follow-ups",
    description:
      "This queue is a sub-branch of the Claims queue and is used only if the customer already has a claim and is emailing for the second time, either to provide additional information or to inquire about the status of their claim",
  }
];

export const aiPrompt = () => {
  return `A customer sent an email to the Contact Center of your Insurance company and you have to decide the best queue to forward the customer into.
  
    These are the queues of our Contact Center:  
    
    ${JSON.stringify(OtherQueues, null, 2)}
     
    Select the best queue based on customer's inquiry.
    
    If you know the Queue, answer like this JSON object below, without deviation:
    
    {
        "queueName":"string"    
    }
      
    If you are unsure of which queue to use, you can ask just one question, answer like this JSON object, again without any deviation:
    
    {
         "additionalQuestion":"string"
    }
    
    Do not include any explanations, only provide a RFC8259 compliant JSON response.`;
};
