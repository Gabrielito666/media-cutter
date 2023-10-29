export const setVideo = ( { e, drop, setVideoSrc } ) => {

    const condition = drop ?
        ( e.dataTransfer.items && e.dataTransfer.items[ 0 ] ) :
        ( e.target.files && e.target.files[ 0 ] )
    ;
    const file = drop ? e.dataTransfer.items[ 0 ].getAsFile() : e.target.files[ 0 ];
    const urlFile = URL.createObjectURL( file );
    e.preventDefault();
    if( condition ) setVideoSrc( urlFile );
}