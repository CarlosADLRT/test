import React, {Component} from 'react';
import ModalComponent from '../ModalComponent';
import CustomBoxDetailItemComponent
    from '../../../Presentational/CustomBoxComponent/CustomBoxDetailItemComponent/CustomBoxDetailItemComponent';

class CustomBoxDetailComponent extends Component {

    render() {
        const {data} = this.props;

        return (
            <ModalComponent
                title={'Custom Box Details\n'}
                onClose={this.props.onClose}
                footerEnabled={false}
                className={'manage-growers-dialog'}
                iconClassName='fa fa-archive'
                body={
                    <ul className="list-unstyled mb-0 custom-box-list">
                        {
                            data.map(item => {
                                return <CustomBoxDetailItemComponent data={item}/>;
                            })
                        }
                    </ul>
                }>
            </ModalComponent>
        );
    }
}

export default CustomBoxDetailComponent;
