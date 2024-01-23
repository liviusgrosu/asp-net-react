import { Duck } from "./demo"

// We're using a Props interface because we have to explicitly define teh property of the DuckItem function
interface Props {
    duck: Duck
}

export default function DuckItem(props: Props) {
    return (
        <div key={props.duck.name}>
          <span>{props.duck.name}</span>
          <button onClick={() => props.duck.makeSound(props.duck.name + ' quack')}>Make Sound</button>
        </div>
    )
}