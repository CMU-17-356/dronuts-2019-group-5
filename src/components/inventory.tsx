import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { formatPrice } from './helpers';
import './inventory.css';

export interface InventoryItemProps {
  id: string;
  name: string;
  ingredients: string;
  priceInCents: number;
  inStock: boolean;
}

export interface InventoryProps {
  items: InventoryItemProps[];
}

export interface InventoryState {
  compilation: { [key: string]: InventoryItemProps };
  newEntry: InventoryItemProps;
}

export class Inventory extends React.Component<InventoryProps, InventoryState> {
  constructor(props: InventoryProps) {
    super(props);

    let compilation: { [key: string]: InventoryItemProps } = {};
    for (let item of this.props.items) {
      compilation[item.id] = item;
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

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;

    this.setState({
      newEntry: {
        ...this.state.newEntry,
        [target.name]: target.value
      }
    });


    if (target.name == "inStock") {
      this.setState({
        newEntry: {
          ...this.state.newEntry,
          [target.name]: target.checked
        }
      });
    }

  }


  handleSubmit(event: FormEvent) {
    event.preventDefault();

    let tempEntry: InventoryItemProps = enterEntry();
    if (this.state.compilation[this.state.newEntry.id]) {
      alert('A donut with that ID was already submitted: ');
    }
    else {
      this.setState({
        compilation: {
          ...this.state.compilation,
          [this.state.newEntry.id]: this.state.newEntry
        },
        newEntry: tempEntry
      });
      alert('A donut was submitted: ');
    }
  }

  renderInput() {
    return (
      <div className="input-container">
        <form onSubmit={this.handleSubmit}>
          <label> ID:
          <input
              name="id"
              type="text"
              value={this.state.newEntry.id}
              onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Name:
          <input
              name="name"
              type="text"
              value={this.state.newEntry.name}
              onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Ingredients:
          <input
              name="ingredients"
              type="text"
              value={this.state.newEntry.ingredients}
              onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Price (in cents):
          <input
              name="priceInCents"
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

  updateInStock(id: string) {
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

  renderInventoryItem(itemProps: InventoryItemProps) {
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
        <td className="inventory-item-instock">{displayYesNo(inStock)}</td>
        <span className="inventory-item-instock-value"></span>
        <button className="inventory-item-instock-toggle-button" onClick={this.updateInStock(id)}> Update </button>
      </tr>
    );
  }
}
function displayYesNo(inStock: boolean): string {
  if (inStock) {
    return "Yes";
  }
  else {
    return "No";
  }
}

function enterEntry(): InventoryItemProps {
  let newEntry = { id: "-1", name: "none", ingredients: "None", priceInCents: 0, inStock: false };

  return newEntry;
}

export default Inventory;
