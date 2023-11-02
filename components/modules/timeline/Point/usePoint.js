import { getFamilySetters } from "@/components/tools";

export const usePoint = ( { points, setPoints, i } ) => {
    const { pointsList, selectedMode, lastSelectedPoint } = points;
    const [ setSelectedMode, setLastSelectedPoint ] = 
        getFamilySetters( [ 'selectedMode', 'lastSelectedPoint', 'pointClicked' ], setPoints  )
    ;
    const selectPoint = ( e ) => {
        setSelectedMode( () => ( !( lastSelectedPoint === `${i}` ) || !selectedMode ) ); //boolean to select
        setLastSelectedPoint( e.target.id );   
    };
    const pointColor = ( selectedMode && `${i}` === `${lastSelectedPoint}` ) ? 'orange' : 'yellow'

    return { pointColor, selectPoint, pointsList }
};