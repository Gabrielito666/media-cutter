import { usePreview } from "./usePreview";
export const Preview = ( { videoThings, setVideoThings } ) => {

    const { timeUpdate, videoDurationChange, onDrop, onFileChange, videoSrc, videoRef, fileInputRef } =
        usePreview( { videoThings, setVideoThings } );
    ;

    const Screen = <video
        controls
        src = { videoSrc }
        ref = { videoRef }
        width = "320"
        height = "240"
        onTimeUpdate = { timeUpdate }
        onLoadedMetadata = { videoDurationChange }
    />;
    const Default = <div>Drag a video here or select one with the button</div>;

    const InputFile = () => <>
        <input type = "file"
            ref = { fileInputRef }
            style = { { display : 'none' }}
            onChange = { onFileChange }
            accept = "video/*"
        />
        <button onClick = { () => fileInputRef.current.click() }>Examinar</button>
    </>;

    return < section className = "preview" onDrop = { onDrop } onDragOver = { ( e ) => e.preventDefault() } >
            { videoSrc ? Screen : Default }
            <InputFile/>
        </section>
    ;
};