import "./fooditem.css"

const FoodItem = (foodItemObj) => {
    if (!foodItemObj.props.length)
        return (<div> Currently unavailable! Please try after later!</div>)
    else {
        return (
            <div className="food-items">
                {
                    foodItemObj.props.map(
                        item => (
                            <div className="container" key={item.id} >
                                <div className="itemImage">
                                    <img src={item.itemImageUrl} alt="Image of food item" />
                                </div>
                                <div className="details">
                                    <div>
                                        <h4>{item.name}</h4>
                                        <h6>{item.description}</h6>
                                    </div>
                                    <div>
                                        <button >add</button>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        );
    }
}

export default FoodItem;