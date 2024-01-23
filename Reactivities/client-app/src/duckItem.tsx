import { Duck } from "./demo"

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