import { HiOutlineShoppingBag } from "react-icons/hi2";

export const Shop = () => {
    return (
        <div className="w-full clickable">
            <div className="w-full relative overflow-hidden rounded-4xl sm:h-[600px]">
                <div className="absolute inset-0 bg-black bg-opacity-0 z-10 p-6 flex items-end justify-end">
                    <div className="vertical-center bg-zinc-100 rounded-2xl clickable">
                    <p className="text-black text-2xl font-semibold italic px-4 py-4"><HiOutlineShoppingBag /></p>
                    </div>
                </div>
                <img 
                    className="h-full w-full object-cover rounded-4xl" 
                    src="https://images.pexels.com/photos/17917176/pexels-photo-17917176/free-photo-of-woman-and-man-posing-in-gym-clothing.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="" 
                />
            </div>
        </div>
    );
};

