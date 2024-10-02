import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDetail = () => {
    const { id } = useParams();
    const product = useSelector((state) => state.products.allProducts.find(p => p.id === parseInt(id)));

    if (!product) return <p>Product not found</p>;

    return (
        <div className="product-detail p-4">
            <div className="flex flex-col md:flex-row">
                <img src={product.image} alt={product.title} className="w-full md:w-1/2 h-auto object-cover mb-4 md:mb-0" />
                <div className="md:ml-4">
                    <h2 className="text-2xl font-bold">{product.title}</h2>
                    <p className="text-lg text-blue-600 font-bold">${product.price}</p>
                    <p className="text-sm text-gray-600">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                    <p className="mt-4">{product.description}</p>
                    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
