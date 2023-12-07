const loader = document.getElementById("loading");
const home = document.getElementById("home");
const paidThroughAccount = document.getElementById("paidAccount");
const expenseAccount = document.getElementById("expenseAccount");
const invoiceStatusSent = document.getElementById("invoice-status-sent");
const invoiceStatusPaid = document.getElementById("invoice-status-paid");
const commissionTypePercentage = document.getElementById("commission-type-percentage");
const commissionTypeAmount = document.getElementById("commission-type-amount");
const rate = document.getElementById("rate");
const specificationTypeSubtotal = document.getElementById("specification-subtotal");
const specificationTypeTotal = document.getElementById("specification-total");
const sentContainer = document.getElementById("sentContainer");
const paidContainer = document.getElementById("paidContainer");
const paidThroughContainer = document.getElementById("paidThroughContainer");

// SelectOption are added  
const createSelectOption = (array, elementID) => {
  for (let data of array) {
    let option = document.createElement("option");
    option.value = data.id;
    option.text = data.text;
    option.name = data.text;
    elementID.appendChild(option);
  }
};
let type=commissionTypePercentage.value; 
let status= invoiceStatusSent.value;
let specification_type=specificationTypeSubtotal.value;

// ONCLICK FUNCTIONS 
function comissionType() {
  type = event.target.value;
}
function invoiceStatus() {
  status = event.target.value;
  if (status === "sent") {
    sentContainer.classList.remove("invisible");
    sentContainer.classList.remove("position-absolute");
    sentContainer.appendChild(document.getElementById("data"));
    paidThroughContainer.classList.remove("invisible");
    paidThroughContainer.classList.remove("position-absolute");

  }
  else {
    sentContainer.classList.add("invisible");
    sentContainer.classList.add("position-absolute");
    paidContainer.appendChild(document.getElementById("data"));
    paidThroughContainer.classList.add("invisible");
    paidThroughContainer.classList.add("position-absolute");

  }
}
function specification() {
  specification_type = event.target.value;
}

window.onload = () => {

  ZFAPPS.extension.init().then(async (zapp) => {

    ZFAPPS.invoke("RESIZE", { width: "550px", height: "600px" });
    const { organization } = await ZFAPPS.get("organization");
    const domainAPI = organization.api_root_endpoint;
    const connection_link_name = "salesperson_commission_books"; // Replace the connection_link_name which you created in the sigma developer portal 
    const orgVariablePlaceholder = "vl__u76nt_data_store"; // Replace the GlobalFields placeholder which you created in the sigma developer portal

    // Error Notification Function 

    let showErrorNotification = async (msg) => {
      await ZFAPPS.invoke("SHOW_NOTIFICATION", {
        type: "error",
        message: msg,
      });
    };

    // GET Paid Through Account
    const getPaidThroughAccount = async () => {

      try {
        let get_paid_Account = await ZFAPPS.request({
          url: `${domainAPI}/autocomplete/paidthroughaccountslist`,
          method: "GET",
          url_query: [
            {
              key: "organization_id",
              value: organization.organization_id,
            },
          ],
          connection_link_name: connection_link_name,
        });

        const { data: { body } } = get_paid_Account;
        const { results } = JSON.parse(body);
        createSelectOption(results, paidThroughAccount);

      } catch (err) {
        showErrorNotification(err);
      }
    };
    // GET Expense Account
    const getExpenseAccount = async () => {
      try {
        const get_expense_account = {
          url: `${domainAPI}/autocomplete/expenseaccountslist`,
          method: "GET",
          url_query: [
            {
              key: "organization_id",
              value: organization.organization_id,
            },
          ],
          connection_link_name: connection_link_name,
        };


        const { data: { body } } = await ZFAPPS.request(get_expense_account);
        const { results } = JSON.parse(body);
        createSelectOption(results, expenseAccount);

      } catch (err) {
        showErrorNotification(err);
      }
    };
    //Get the GlobalField 
    const getOrgVariable = async () => {

      try {
        const load_placeholder = {
          url: `${domainAPI}/settings/orgvariables/${orgVariablePlaceholder}`,
          method: "GET",
          url_query: [
            {
              key: "organization_id",
              value: organization.organization_id,
            },
          ],
          connection_link_name: connection_link_name,
        };
        let { data: { body }, } = await ZFAPPS.request(load_placeholder);
        let { orgvariable: { value }, } = JSON.parse(body);
        if(value){

          value = JSON.parse(value);
          let {
            status,
            commission,
            type,
            specification_type,
            paid_through_account,
            expense_account,
          } = value;
          if (status === "sent") {
            invoiceStatusSent.checked = true;
          }
          else {
            invoiceStatusPaid.checked = true;
          }
          if (specification_type === "SubTotal") {
            specificationTypeSubtotal.checked = true;
          }
          else {
            specificationTypeTotal.checked = true;
          }
          if (type === "Percentage") {
            commissionTypePercentage.checked = true;
          }
          else {
            commissionTypeAmount.checked = true;
          }
          if (paid_through_account !== undefined && expense_account !== undefined) {
  
            paidThroughAccount.value = paid_through_account.id;
            expenseAccount.value = expense_account.id;
          }
          rate.value = commission;
        }
      } catch (err) {
        await showErrorNotification(err);
      }
    };

    await getPaidThroughAccount();
    await getExpenseAccount();
    await getOrgVariable();
    loader.classList.add("invisible");
    home.classList.remove("invisible");

    // ON PRE SAVE CHECK
    zapp.instance.on("ON_SETTINGS_WIDGET_PRE_SAVE", async () => {
      if (rate.value !== undefined && rate.value !== "") {
        let isError = await checkAccount(status);
        if (isError) {
          return {
            prevent_save: true,
          };
        } else {
          await updateOrgVariable();
        }
      }
      else {
        await showErrorNotification("Commission Rate cannot be empty");
        return {
          prevent_save: true,
        };
      }
    });


    let checkAccount = async (status) => {
      if (!expenseAccount.value) {
        await showErrorNotification("Please select the Expense Account");
        return true;
      }
      if (status !== "paid" && !paidThroughAccount.value) {
        await showErrorNotification("Please select the Paid Through Account");
        return true;
      }
    };

    // UPDATE Global Fields 
    const updateOrgVariable = async () => {
      let value = {};
      let expense_account = {
        id: expenseAccount.value,
        text: expenseAccount.options[expenseAccount.selectedIndex].text,
      };
      let paid_through_account = {
        id: paidThroughAccount.value,
        text: paidThroughAccount.options[paidThroughAccount.selectedIndex].text,
      };
      let commission = rate.value;

      Object.assign(value, {
        status,
        expense_account,
        type,
        commission,
        specification_type,
        paid_through_account,
      });
      let data = { value: value };

      ZFAPPS.request({
        url: `${domainAPI}/settings/orgvariables/${orgVariablePlaceholder}`,
        method: "PUT",
        url_query: [
          {
            key: "organization_id",
            value: organization.organization_id,
          },
        ],
        body: {
          mode: "formdata",
          formdata: [
            {
              key: "JSONString",
              value: JSON.stringify(data),
            },
          ],
        },
        connection_link_name: connection_link_name,
      });
    };
  });
};