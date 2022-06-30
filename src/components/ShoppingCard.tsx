import { Offcanvas, Stack } from "react-bootstrap"
import { CardItem } from "./CardItem"
import { useShoppingCard } from "../context/ShoppingCardContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

type ShoppingCardProps = {
  isOpen: boolean
}

export function ShoppingCard({ isOpen }: ShoppingCardProps) {
  const { closeCard, cardItems } = useShoppingCard();
  return (
    <Offcanvas show={isOpen} onHide={closeCard} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cardItems?.map(item => (
            <CardItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cardItems.reduce((total: number, cardItem) => {
                const item = storeItems.find(i => i.id === cardItem.id)
                return total + (item?.price || 0) * cardItem.quantity
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
