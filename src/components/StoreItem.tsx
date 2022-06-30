import {Button, Card} from "react-bootstrap";
import {formatCurrency} from "../utilities/formatCurrency";
import {useShoppingCard} from "../context/ShoppingCardContext";

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

export function StoreItem({id, name, price, imgUrl}: StoreItemProps){
    const {
        getItemQuantity,
        increaseCardQuantity,
        decreaseCardQuantity,
        removeFromCard
    } = useShoppingCard();

    const quantity = getItemQuantity(id);

    return(
    <Card className="h-100">
        <Card.Img
            variant="top"
            src={imgUrl}
            height={"200px"}
            style={{objectFit: "cover"}}
         />
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-item-baseline mb-4">
                <span className="fs-2">{name}</span>
                <span className="ms-2 text-muted">{formatCurrency(price)}</span>
            </Card.Title>
            <div className="mt-auto">
                {quantity === 0 ? (
                    <Button className="w-100" onClick={() => increaseCardQuantity(id)}>+ Add to card</Button>
                ) : (
                    <div className="d-flex align-items-center flex-column"
                        style={{gap: ".5rem"}}
                    >
                        <div className="d-flex align-items-center"
                             style={{gap: ".5rem"}}>
                            <Button onClick={() => decreaseCardQuantity(id)}>-</Button>
                            <div>
                                <span className="fs-3">{quantity}</span>
                            </div>
                            <Button onClick={() => increaseCardQuantity(id)} >+</Button>
                        </div>
                            <Button onClick={() => removeFromCard(id)} variant="danger" size="sm">
                                Remove
                            </Button>
                    </div>
                )}
            </div>
        </Card.Body>
    </Card>
    );
}
