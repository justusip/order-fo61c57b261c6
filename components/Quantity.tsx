const Quantity = (props: { value: number, setValue: (value: number) => void }) =>
    <div className={"quantity"}>
        <button className={"quantity-btn generic-btn"}
                onClick={() => props.setValue(props.value - 1)}
                disabled={props.value <= 1}>
            -
        </button>
        <div className={"quantity-val"}>{props.value}</div>
        <button className={"quantity-btn generic-btn"}
                onClick={() => props.setValue(props.value + 1)}>
            +
        </button>
    </div>;

export default Quantity;
