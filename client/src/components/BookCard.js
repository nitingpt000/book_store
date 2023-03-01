import { Card } from "antd";
import { Images } from "../assets";
const { Meta } = Card;
const BookCard = () => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    className="m-2 p-2"
    cover={<img alt="example" src={Images.book1} />}
  >
    {/* <Meta
      title="The Courage to Be Free: Florida's Blueprint for America's Revival"
      description="$40.34"
    /> */}
    <div>The Courage to Be Free: Florida's Blueprint for America's Revival</div>
    <div>$40.34</div>
  </Card>
);
export default BookCard;
