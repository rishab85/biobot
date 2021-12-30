const styleMapper = {
    container: ( props = {} ) => {

        if ( !props || ( !props.width || !props.height ) ) return {};

        return {
            width: props.width,
            position: 'relative',
            height: props.height
        };

    },
    listWrapper: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: 'auto',
        position: 'absolute'
    },
    list: ( height ) => ( {
        height,
        position: 'relative'
    } ),
    item: ( index, height ) => ( {
        height,
        left: 0,
        right: 0,
        top: height * index,
        position: 'absolute'
    } )
};

export default styleMapper;