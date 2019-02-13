import * as React from 'react';
import './inventory.css';

export interface InventoryItemProps{
	id: string;
	name: string;
	ingredients: string;
	priceInCents: number;
    inStock: boolean;
}

export interface InventoryState{
    compilation: {[key: string]: InventoryItemProps};
    emptyEntry: InventoryItemProps;
}

export class Inventory extends React.Component<InventoryItemProps, InventoryState> { 
    constructor(props: InventoryItemProps) {
    super(props);
        
    let compilation: {[key: string]: InventoryItemProps} = {};
    let tempEntry: InventoryItemProps = enterEntry("-1", "blank", "blank ingredients", "0", false);

    this.state = {
      compilation: compilation,
      emptyEntry: tempEntry,
    };
        
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
    render() {
        return (
          <div className="keyed-inventory-container">
            {this.renderInput()}
            {this.renderCompleteInventory()}
          </div>
        );
      }
  
    handleChange(event) {
        this.setState(prevState => ({
            ...prevState,
            emptyEntry:{
                ...prevState.cart,
                [id]: {
            ...prevState.cart[id],
            quantity: prevState.cart[id].quantity
            }
        }));
    }
 	
    handleSubmit(event) {
    	event.preventDefault();
        Object.keys(this.state.compilation).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
    	
  	}

  renderInput() {
    return (
    <div className="input-container">
      <form> 
          <label>
          ID:
          <input type="text"/>
        </label>
        <br />
        <label>
          Name:
          <input type="text"/>
        </label>
        <br />
        <label>
         Ingredients:
          <input type="text"/>
        </label>
        <br />
        <label>
          Price (in cents):
          <input
            name="priceInput"
            type="number"/>
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
      return <div className="inventory-container" />
    }

    const compilationItems = nonzero.map(
      (item: KeyedInventoryItemProps) => (this.renderInventoryItem(item))
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

  renderInventoryItem(itemProps: KeyedInventoryItemProps){
  	const {
  		id,
  		name,
  		ingredients,
  		priceInCents
  	} = itemProps;

 	if (priceInCents <= 0) {
		throw new Error(`Illegal price ${priceInCents}`);
    }

    return (
      <tr className="inventory-item" key={id}>
        <td className="inventory-item-id">{id}</td>
        <td className="inventory-item-name">{name}</td>
        <td className="inventory-item-ingredients">{ingredients}</td>
        <td className="inventory-item-price price">{formatPrice(priceInCents)}</td>
        <td className="inventory-item-instock">{inStock}</td>
        <td className="inventory-item-instock-toggle">
        <span className="inventory-item-instock-value">{this.state.compilation[id].inStock}</span>
          <button className="inventory-item-instock-toggle-button" onClick={this.updateInStock(id)}> Update </button>
         </td>
      </tr>
    );
  }
    
}

function enterEntry(config: InventoryItemProps): {id: string; name: string; ingredients: string; priceInCents: number; inStock: Boolean} {
    let newEntry = {id:0, name: "none", ingredients: "None", priceInCents = 0, inStock: false};
    
    if (config.id) {
        newEntry.id = config.id;
    }
    if (config.name) {
        newEntry.name = config.name;
    }
    if (config.ingredients) {
        newEntry.ingredients = config.ingredients;
    }
    if (config.priceInCents) {
        newEntry.priceInCents = config.priceInCents;
    }
    if (config.inStock) {
        newEntry.inStock = config.inStock;
    }
    return newEntry;
}

function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}

export default Inventory;