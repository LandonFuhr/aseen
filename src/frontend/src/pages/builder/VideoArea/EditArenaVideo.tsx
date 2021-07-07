export const EditArenaVideo = (props: EditArenaVideoProps) => {
  return <video src={props.vidSrc} width="100%" controls />;
};

export interface EditArenaVideoProps {
  vidSrc: string;
}
