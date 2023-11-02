import { usePoint } from "./usePoint";
export default ( { i, points, setPoints } ) =>{

    const { pointColor, selectPoint, pointsList } = usePoint( { i, points, setPoints } )


    return <div
        className = 'point'
        style = { { left: `${ pointsList[i].percentage }%`, backgroundColor: pointColor } }
        onDoubleClick = { selectPoint }
        id = { i }
    />
}
