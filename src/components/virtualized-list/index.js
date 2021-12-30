import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styleMapper from './helper';


export default function List( props ) {

    const [ scrollTop, setScrollTop ] = useState( 0 );
    const [ visibleHeight, setVisibleHeight ] = useState( 0 );
    const hasMount = useRef( false );
    const containerRef = useRef( null );
    const listWrapperRef = useRef( null );
    const listRef = useRef( null );

    useEffect( ()=>{

        const { currentActive, rowHeight } = props;
        if ( !hasMount.current ) {

            // Only runs on didmount
            hasMount.current = true;

            getWrapper()
            .addEventListener( 'scroll', ( e ) => setScrollPosition( e ), true );

            const visibleHeight = parseFloat(
                window
                .getComputedStyle( getWrapper(), null )
                .getPropertyValue( 'height' )
            );

            setVisibleHeight( visibleHeight );

        }

        listWrapperRef.current && listWrapperRef.current.scroll && listWrapperRef.current.scroll( { top: currentActive * rowHeight } );


    }, [ props.currentActive ] );

    function getCount() {

        return props.source.length;

    }

    function getScrollPosition() {

        return scrollTop;

    }

    function getHeight() {

        return getCount() * props.rowHeight;

    }

    function getWrapper() {

        return listWrapperRef.current;

    }

    window.test = listWrapperRef;

    function getDefaultHeightWidth() {

        return ( props.className ? {} : { height: '100%', width: '100%' } );

    }

    function setScrollPosition( event ) {

        setScrollTop( event.target.scrollTop );

    }

    function checkIfVisible( index ) {

        const { rowHeight, overScanCount } = props;

        const elemPosition = index * rowHeight;

        return (
            elemPosition > getScrollPosition() - overScanCount * rowHeight && elemPosition + rowHeight <
            getScrollPosition() + visibleHeight + overScanCount * rowHeight
        );

    }

    return (
        <div
            style={ styleMapper.container( getDefaultHeightWidth() ) }
            className={ props.className }
            ref={ containerRef }
        >
            <div style={ styleMapper.listWrapper } ref={ listWrapperRef }>
                <div className='overflowx-hidden' style={ styleMapper.list( getHeight() ) } ref={ listRef }>
                    { props.source.map(
                        ( data, index ) =>
                            checkIfVisible( index ) &&
                            props.renderItem( {
                                index: index,
                                data: data,
                                style: styleMapper.item( index, props.rowHeight )
                            } )
                        )
                    }
                </div>
            </div>
        </div>
    );

}

List.defaultProps = {
    source: [], // list of data
    rowHeight: 24, // height of each row
    overScanCount: 5 // row we want to prebuild
};

List.propTypes = {
    renderItem: PropTypes.func, // method which will run for each row
    rowHeight: PropTypes.number, // height of the each row
    className: PropTypes.string, // classname to be applied to the container
    source: PropTypes.array.isRequired, // data from api
    overScanCount: PropTypes.number.isRequired // number of rows we want to prebuild
};