import * as React from 'react';
import './inventory.css';

export interface InventoryItemProps{
	id: string;
	name: string;
	ingredients: string;
	priceInCents: number;
}

export interface KeyedInventoryItemProps extends InventoryItemProps {
  inStock: boolean;
}

export interface InventoryProps{
	items: InventoryItemProps[];
}

export interface InventoryState{
    compilation: {
        [key:string]:KeyedInventoryItemProps
    };
}

export class Inventory extends React.Component<InventoryProps, InventoryState> { 
    constructor(props: InventoryProps) {
    super(props);
        
    let compilation: { [key: string]: KeyedInventoryItemProps } = {};
        
    for (let item of this.props.items) {
      cart[item.id] = {
        ...item,
        inStock: true
      };
    }

    this.state = {
      compilation: compilation,
    };   
  }
    
    render() {
        return (
          <div className="keyed-inventory-container">
            {this.renderInput()}
            {this.renderCompleteInventory()}
          </div>
        );
      }

    //needs edit
   renderInput() {
    const inventoryItems = this.props.items.map(
      (itemProps: InventoryItemProps) => (this.renderInventoryItem(itemProps))
    );
    return (
      <div className="inventory-container">
        <h1 className="inventory-title">Inventory</h1>
        <table className="menu">
          <tbody>
            {inventoryItems}
          </tbody>
        </table>
      </div>
    )
  }

  renderCompleteInventory() {
    let nonzero: KeyedInventoryItemProps[] = [];
    for (let key of Object.keys(this.state.compilation)) {
      if (this.state.compilation[key].quantity > 0) {
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

function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}

export default Inventory;