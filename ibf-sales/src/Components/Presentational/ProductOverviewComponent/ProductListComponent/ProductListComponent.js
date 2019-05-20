import React, {Component} from 'react';
import CardProductContainer from '../../../Containers/CardProductContainer/CardProductContainer';

class ProductListComponent extends Component {
  render() {
    const {list} = this.props;
    return (<div className="row justify-content-center m-0">
      {list.map((item, i) => (
        <div className="px-2 mb-4" key={`${item.inventory}-${i}`} style={{width:'280px'}}>
          <CardProductContainer product={item} index={i}/>
        </div>
      ))}
    </div>);
  }
}

export default ProductListComponent;
