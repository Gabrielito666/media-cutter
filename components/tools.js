const functionOrValue = ( x, param ) => typeof x === 'function' ? x( param ) : x;
export const set = ({ value, item, setter }) => {
    setter(prev =>  ( { ...prev, [ item ] : functionOrValue( value, prev[ item ] ) } ) );
};
export const getExplicitSetter = ( item, setter ) => value => { set( { value, item, setter } ); };
export const getFamilySetters =
    ( items, setter ) => items.map( i => value => { getExplicitSetter( i, setter )( value ); } )
;
export const getPercentage = ( a, b ) => ( ( a / b ) * 100 );
export const getPosition = ( a, b ) => ({ percentage : getPercentage( a, b ), time : a });