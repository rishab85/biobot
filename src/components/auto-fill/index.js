import React from 'react';
import VirtualizedList from '../virtualized-list'

function AutoFill(props){

    const {data, currentActive} = props;

    function renderItem({index, style, data}){

        const {id, label_id, shipping_tracking_code}=data;
        const isActive = currentActive === index ? 'active' : '';
        return (
            <div
                className={`autofill__list ${isActive}`}
                key={id}
                style={style}
             >
                 <div className='autofill__list-column'>{id}</div>
                 <div className='autofill__list-column'>{label_id}</div>
                 <div className='autofill__list-column'>{shipping_tracking_code}</div>
            </div>
        )

    }

    if(!data.length) return null;

    return(<div className='auto__fill'>
        <div className='autofill__list autofill__header'>
                 <div className='autofill__list-column'>ID</div>
                 <div className='autofill__list-column'>Label ID</div>
                 <div className='autofill__list-column'>Shipping Tracking Code</div>
            </div>
        <VirtualizedList 
            source={data}
            rowHeight={40}
            renderItem={renderItem}
            currentActive={currentActive}
        />
    </div>)

}

export default AutoFill