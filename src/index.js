import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const columns = [
  {
    Header: "Produits",
    columns: [
      {
        Header: "Category",
        accessor: "category",
       
      },
      {
        Header: "createdAt",
        id: "createdAt",
        accessor: d => d.createdAt
      }
      ,
      {
        Header: "datasheet",
        id: "datasheet",
        accessor: d => d.datasheet
      },
      {
        Header: "description",
        id: "description",
        accessor: d => d.description
      },
      {
        Header: "link",
        id: "link",
        accessor: d => d.link
      },
      {
        Header: "modelId",
        id: "modelId",
        accessor: d => d.modelId
      }
    ]
  }
];
const specificationsColumns = [
  {
    Header: "specifications",
    columns: [
      {
        Header: "Name",
        accessor: "name",

      },
      {
        Header: "Category",
        id: "category",
        accessor: d => d.category
      },
      {
        Header: "value",
        id: "value",
        accessor: d => d.value
      }
    ]
  }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      expanded: {}
    };
  }

  componentDidMount() {
    fetch("http://app.getrecall.com:8080/products", {
      method: "get",
      headers: { "content-type": "application/json" }
    })
      .then((res) => res.json())
      .then(
        (result) => {

          this.setState({data: result.products});
        
        
         console.log("RES",result);
        },
        (error) => {
          console.log("ERR", error);
        }
      );
  }

  render() {
    const { data } = this.state;
    
    return (
      <div>
      <h1>TEST1</h1>
      <h3>BADR EL ABBASSI , badr_elabbassi@um5.ac.ma</h3>
         <ReactTable
          data={data}
          filterable
          columns={columns}
          defaultPageSize={22}
          className="-striped -highlight"
          SubComponent={row => {
            const list = data[row.index].features.map((feature) =>
                <li>{feature}</li>
              );
            return (
              <div style={{ padding: "20px" }}>
                <ReactTable
                  data={data[row.index].specifications}
                  columns={specificationsColumns}
                  defaultPageSize={16}
                  showPagination={false}
                />
                <div>
                <h1>Liste des features de produit {row.index+1}</h1>
               <ul> {list}</ul>
               </div>
              </div>

            );
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
