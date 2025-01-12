export const columnsDataDevelopment = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "TECH",
    accessor: "tech",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];

export function formatDate(inputDate) {
  // Create a Date object from the input string
  const dateObj = new Date(inputDate);

  // Options for formatting the date
  const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
  };

  // Format the date using toLocaleString
  const formattedDate = dateObj.toLocaleString('en-US', options);

  return formattedDate;
}

export const columnsDataCheck = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "REGISTRATION DATE",
    accessor: "registrationDate",
  },
];

export const columnsDataColumns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];

export const columnsDataComplex = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];
