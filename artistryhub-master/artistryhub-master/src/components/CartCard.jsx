import React, {useEffect} from 'react';
import {AiOutlineClose} from "react-icons/ai";
import {LiaPaintBrushSolid} from "react-icons/lia";
import {FaRegUser} from "react-icons/fa";
import {IoPricetags} from "react-icons/io5";

function CartCard({item, removeFromCart}) {
    const [data, setData] = React.useState(item);

    useEffect(() => {
        setData(item);
    }, [item]);

    return (
        <div className={`grid grid-cols-2 gap-4`}>
            {data && (
                <>
                    <img
                        className={`h-[200px] w-full object-cover`}
                        src={`http://localhost:3000/image/${data?.image}`}
                        alt=""
                    />
                    <div className={`flex flex-col relative`}>
                        <div className={`absolute cursor-pointer right-0`} onClick={() => removeFromCart(data.id)}>
                            <AiOutlineClose/>
                        </div>
                        <p className={`font-semibold text-lg`}>{data?.name}</p>

                        <div className={`flex items-center gap-2`}>
                            <LiaPaintBrushSolid/>
                            <p>{data?.category}</p>
                        </div>
                        <div className={`flex items-center gap-2`}>
                            <FaRegUser/>
                            <p>{data?.artist}</p>
                        </div>
                        <div className={`flex items-center gap-2 mt-auto text-xl font-semibold`}>
                            <IoPricetags/>
                            <p>Rs.{data?.price}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartCard;
