// import styles from "./Loader.module.css"
// const Loader = () => {
//   return (
//     <div id={styles.outer}>
//       <div id={styles.middle}>
//         <div id={styles.inner}></div>
//       </div>
//     </div>
//   )
// }

// export default Loader

interface LoaderProps {
  src?: string;
}

export default function Loader(props: LoaderProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {props.src ? (
        <img src={props.src} />
      ) : (
        <div className="flex space-x-2">
          <div className="h-8 w-8 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 animate-bounce rounded-full bg-green-500 [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 animate-bounce rounded-full bg-red-500"></div>
        </div>
      )}
    </div>
  );
}

// USE:
/*
import Loader from '@acme/ui/Loader'

return (
---
  <Loader />
---
)
*/
