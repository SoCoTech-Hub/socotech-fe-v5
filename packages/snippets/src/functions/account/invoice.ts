// const handleSendInvoice = async () => {
//   try {
//     await api.post(`/email`, {
//       from: "info@topic.co.za",
//       to: email,
//       subject: `${organization.name} Invoice ${organization.name
//         .substring(0, 3)
//         .toUpperCase()}-${transaction.mPaymentId}-${zeroPad(event.id, 3)}`,
//       html: Body,
//     });
//     setAlert("Email sent successfully.");
//   } catch (error) {
//     console.error(error);
//     alert(error.message);
//   }
// };

// const generateInvoiceHTML = (
//   transaction,
//   event,
//   organization,
//   date,
//   zeroPad,
//   formatter,
// ) => {
//   return `
//     <div class="w-full">
//       <div class="w-full text-textColor">
//         <div class="row mb-3">
//           <div class="column">
//             <div class="bold text-large">${organization.name} INVOICE</div>
//             <div class="my-3">
//               <div>${transaction.firstName} ${transaction.lastName}</div>
//               ${
//                 transaction.addressLine1
//                   ? `<div>${transaction.addressLine1}</div>`
//                   : ""
//               }
//               ${
//                 transaction.postalCode
//                   ? `<div>${transaction.postalCode}</div>`
//                   : ""
//               }
//               ${transaction.email ? `<div>${transaction.email}</div>` : ""}
//               ${
//                 transaction.company
//                   ? `<div>${transaction.company} ${
//                       transaction.vatNr || ""
//                     }</div>`
//                   : ""
//               }
//             </div>
//           </div>
//           <div class="column text-right mb-3">
//             <div class="bold">Invoice Date:</div>
//             <div>${date.toLocaleDateString()}</div>
//             <div class="bold pt-tiny">Learner Number:</div>
//             <div>${transaction.mPaymentId}</div>
//             <div class="bold pt-tiny">Invoice Number:</div>
//             <div>${organization.name.substring(0, 3).toUpperCase()}${zeroPad(
//               event.id,
//               7,
//             )}</div>
//             <div class="bold pt-tiny">Reference:</div>
//             <div>${organization.name.substring(0, 3).toUpperCase()}-${
//               transaction.mPaymentId
//             }-${zeroPad(event.id, 3)}
// 	</div>
//           </div>
//         </div>
//         <div class="mt-3">
//           <table style="width: 100%; border-collapse: collapse;">
//             <thead class="table-header">
//               <tr>
//                 <td class="desktop:w-10 laptop:w-10 mobile:w-1/2" style="border-bottom: 1px solid #fff; padding: 8px;"><strong>Item</strong></td>
// 								<td class="desktop:hidden laptop:hidden" ></td>
//                 <td class="w-half text-center mobile:hidden" style="border-bottom: 1px solid #fff; padding: 8px;"><strong>Description</strong></td>
//                 <td class="w-10 text-center mobile:hidden" style="border-bottom: 1px solid #fff; padding: 8px;"><strong>Quantity</strong></td>
//                 <td class="w-10 text-center mobile:hidden" style="border-bottom: 1px solid #fff; padding: 8px;"><strong>Unit Price</strong></td>
//                 <td class="w-10 text-center mobile:hidden" style="border-bottom: 1px solid #fff; padding: 8px;"><strong>VAT</strong></td>
//                 <td class="desktop:w-10 laptop:w-10 text-right mobile:w-1/2" style="border-bottom: 1px solid #fff; padding: 8px;"><strong>Amount</strong></td>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td style="border: 1px solid #000; padding: 8px;">${
//                   transaction.item
//                 }</td>
// 								<td class="desktop:hidden laptop:hidden" ></td>
//                 <td class="mobile:hidden" style="border: 1px solid #000; padding: 8px;">${
//                   transaction.description
//                 }</td>
//                 <td class="text-center mobile:hidden" style="border: 1px solid #000; padding: 8px;">1</td>
//                 <td class="text-center mobile:hidden" style="border: 1px solid #000; padding: 8px;">${formatter.format(
//                   transaction.amount * 0.85,
//                 )}</td>
//                 <td class="text-center mobile:hidden" style="border: 1px solid #000; padding: 8px;">15%</td>
//                 <td class="text-right" style="border: 1px solid #000; padding: 8px;">${formatter.format(
//                   transaction.amount,
//                 )}</td>
//               </tr>
//             </tbody>
//             <tfoot class="table-footer">
//               <tr >
// 								<td class="desktop:hidden laptop:hidden" ></td>
// 								<td colspan="4"  class="mobile:hidden" ></td>
//                 <td class="text-right" style="border: 1px solid #000; padding: 8px;"><strong>VAT Total:</strong></td>
//                 <td class="text-right" style="border: 1px solid #000; padding: 8px;">${formatter.format(
//                   transaction.amount * 0.15,
//                 )}</td>
//               </tr>

//               <tr >
// 							  <td class="desktop:hidden laptop:hidden" ></td>
//                 <td colspan="4"  class="mobile:hidden" ></td>
//                 <td  class="text-right" style="border: 1px solid #000; padding: 8px;"><strong>Total:</strong></td>
//                 <td class="text-right" style="border: 1px solid #000; padding: 8px;">${formatter.format(
//                   transaction.amount,
//                 )}</td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//         <div class="flex-wrap">
//           <p class="text-1 leading-tight py-2">
//             Just Brands Africa (PTY) Ltd
//             <br />
//             VAT: 4800270201
//             <br />
//             info@topic.co.za
//             <br />
//             www.topic.co.za
//           </p>
//         </div>
//       </div>
//     </div>
//   `;
// };
