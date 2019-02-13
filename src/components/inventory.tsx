import * as React from 'react';
import { Component, ChangeEvent } from 'react';
import './inventory.css';


export interface InventoryItemProps{
	id: string;
	name: string;
	ingredients: string;
	priceInCents: number;
    inStock: boolean;
}

export interface InventoryProps {
  items: InventoryItemProps[];
}

export interface InventoryState{
    compilation: {[key: string]: InventoryItemProps};
    newEntry: InventoryItemProps;
}
 /*
    render() {
        return (
            <h1 className="inventory-title">"Inventory"</h1>
            <h2> "kjnedlajn lfasdf asdf f"</h2>
        );
      }
      */
    
    //constructor(props: InventoryItemProps) {
    //super(props);
    

export class Inventory extends React.Component<InventoryProps, InventoryState> { 
    constructor(props: InventoryProps) {
    super(props);
        
    let compilation: {[key: string]: InventoryItemProps} = {};
    
    for (let item of this.props.items) {
      compilation[item.id] = {
        ...item 
      };
    }
    
    let tempEntry: InventoryItemProps = enterEntry();

    this.state = {
      compilation: compilation,
      newEntry: tempEntry,
    };
        
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    render() {
        return (
          <div className="keyed-inventory-container">
            Inventory
            {this.renderInput()}
            {this.renderCompleteInventory()}
          </div>
        );
      }
  
    handleChange(event: ChangeEvent<HTMLInputElement>){
        const target = event.target;
        //const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        /*
        this.setState({
            compilation : this.state.compilation,
            emptyEntry: [name]: value
        });
        
        */  
        
        if (target.name = "id"){
                this.state.newEntry.id = target.value;
            }
        if (target.name = "name"){
                this.state.newEntry.name = target.value;
            }
        if (target.name = "ingredients"){
                this.state.newEntry.id = target.value;
            }
        if (target.name = "priceInCents"){
                this.state.newEntry.priceInCents = Number(target.value);
            }
         if (target.name = "inStock"){
                this.state.newEntry.inStock = target.checked;
            }
    }
 	
    handleSubmit(event: Event) {
    	event.preventDefault();
        alert('A name was submitted: ');
        //Object.keys(this.state.compilation).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
    	
  	}

  renderInput() {
    return (
    <div className="input-container">
      <form> 
          <label> ID:
          <input 
              name = "id"
              type="text"
              value={this.state.newEntry.id}
              onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Name:
          <input
              name = "name"
              type="text"
              value={this.state.newEntry.name}
              onChange={this.handleChange} />
        </label>
        <br />
        <label>
         Ingredients:
          <input 
              name ="ingredients"
              type="text"
              value={this.state.newEntry.ingredients}
              onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Price (in cents):
          <input
            name="priceInput"
            type="number"
            value={this.state.newEntry.priceInCents}
            onChange={this.handleChange} />
        </label>
        <br />
        <label className="checkbox">
            <input
                name="inStock"
                type="checkbox"
                checked={this.state.newEntry.inStock}
                onChange={this.handleChange}
            />
            This is currently in stock
        </label>
        <div className="field">
            <div className="control">
                <input
                  type="submit"
                  value="Submit"
                  className="button is-primary"
                />
            </div>
        </div>
      </form>
      </div>
    )
  }

  renderCompleteInventory() {
    let nonzero: InventoryItemProps[] = [];
    for (let key of Object.keys(this.state.compilation)) {
      if (this.state.compilation[key]) {
        nonzero.push(this.state.compilation[key]);
      }
    }

    if (nonzero.length == 0) {
      return <div className="inventory-container" />;
    }

    const compilationItems = nonzero.map(
      (item: InventoryItemProps) => (this.renderInventoryItem(item))
    );


    return (
      <div className="compilation-container">
        <h1 className="compilation-title">Inventory</h1>
        <table className="compilation">  
          <tbody>
            <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Ingredients</th> 
            <th>Price</th>
            <th>In Stock?</th>
            </tr>
            {compilationItems}
          </tbody>
        </table>
      </div>
    )
  }    

  updateInStock(id:string){
      return () => {
        this.setState(prevState => ({
        ...prevState,
        compilation: {
          ...prevState.compilation,
          [id]: {
            ...prevState.compilation[id],
            inStock: !(prevState.compilation[id].inStock)
          }
        }
      }));
      }
  }

  renderInventoryItem(itemProps: InventoryItemProps){
  	const {
  		id,
  		name,
  		ingredients,
  		priceInCents,
        inStock
  	} = itemProps;

 	if (priceInCents < 0) {
		throw new Error(`Illegal price ${priceInCents}`);
    }

    return (
      <tr className="inventory-item" key={id}>
        <td>{id}</td>
            <td className="inventory-item-name">{name}</td>
        <td className="inventory-item-ingredients">{ingredients}</td>
        <td className="inventory-item-price price">{formatPrice(priceInCents)}</td>
        <td className="inventory-item-instock">{inStock}</td>
        <span className="inventory-item-instock-value">{this.state.compilation[id].inStock}</span>
          <button className="inventory-item-instock-toggle-button" onClick={this.updateInStock(id)}> Update </button>
      </tr>
    );
  }
    
}

function enterEntry(): InventoryItemProps {
    let newEntry = {id:"-1", name: "none", ingredients: "None", priceInCents : 0, inStock: false};
    
    return newEntry;
}

function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}

export default Inventory;