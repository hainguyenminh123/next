export interface ProductBlogSection {
	title: string;
	content: string;
	image?: string;
}

export interface WeightOption {
	weight: string;
	price: number;
}

export interface Product {
	id: string;
	name: string;
	price: number;
	currency: string;
	category: 'Khô' | 'Sấy' | 'Hạt' | 'Combo';
	tag: string;
	shortDesc: string;
	image: string;
	description?: string;
	origin?: string;
	storage?: string;
	cookingTips?: string;
	weight?: string;
	weightOptions?: WeightOption[];
	inStock?: boolean;
	blogContent?: {
		intro: string;
		sections: ProductBlogSection[];
	};
}

export const products: Product[] = [
	{
		id: "mang-kho",
		name: "Măng khô",
		price: 140000,
		currency: "VND",
		category: "Khô",
		tag: "Khô tự nhiên",
		shortDesc: "Măng khô chọn lọc, thơm, dễ chế biến.",
		image: "/products/mang-kho.jpg",
		description: "Măng khô Tây Bắc được thu hoạch từ những rừng tre nứa nguyên sinh, phơi nắng tự nhiên theo phương pháp truyền thống. Sợi măng vàng óng, giữ nguyên hương vị đậm đà đặc trưng.",
		origin: "Điện Biên, Sơn La",
		storage: "Bảo quản nơi khô ráo, thoáng mát. Sau khi mở túi, đậy kín và dùng trong 3 tháng.",
		cookingTips: "Ngâm nước ấm 4-6 tiếng trước khi chế biến. Phù hợp nấu canh, xào, kho thịt.",
		weight: "500g",
		weightOptions: [
			{weight: "250g", price: 75000},
			{weight: "500g", price: 140000},
			{weight: "1kg", price: 260000}
		],
		inStock: true,
		blogContent: {
			intro: "Măng khô Tây Bắc là một trong những đặc sản quý giá nhất của vùng núi Tây Bắc Việt Nam. Được thu hoạch từ những rừng tre nứa nguyên sinh trải dài từ Điện Biên đến Sơn La, măng khô mang trong mình hương vị đậm đà của núi rừng, kết tinh từ bàn tay khéo léo của đồng bào dân tộc.",
			sections: [
				{
					title: "Thu hoạch từ rừng nguyên sinh",
					content: "Măng được thu hoạch vào đầu mùa mưa, khi những búp măng non vừa nhú lên khỏi mặt đất. Người dân bản địa có kinh nghiệm hàng chục năm sẽ lựa chọn những búp măng có kích thước vừa phải, không quá già cũng không quá non, đảm bảo độ giòn và hương vị tốt nhất sau khi sấy khô.",
					image: "/products/mang-kho.jpg"
				},
				{
					title: "Quy trình sơ chế truyền thống",
					content: "Sau khi thu hoạch, măng được bóc vỏ, rửa sạch và luộc qua nước sôi để loại bỏ vị đắng tự nhiên. Đây là công đoạn quan trọng quyết định chất lượng sản phẩm cuối cùng. Măng sau khi luộc được xả nước lạnh nhiều lần để giữ được độ giòn và màu sắc đẹp.",
					image: "/products/mang-kho.jpg"
				},
				{
					title: "Phơi nắng tự nhiên",
					content: "Măng được phơi dưới ánh nắng mặt trời Tây Bắc trong 7-10 ngày liên tục. Quá trình phơi nắng tự nhiên giúp măng khô đều, giữ được hương thơm đặc trưng và có thể bảo quản được lâu dài mà không cần chất bảo quản. Sợi măng sau khi khô có màu vàng óng, thơm nhẹ mùi nắng.",
					image: "/products/mang-kho.jpg"
				}
			]
		}
	},
	{
		id: "lon-say",
		name: "Lợn sấy",
		price: 450000,
		currency: "VND",
		category: "Sấy",
		tag: "Đậm vị",
		shortDesc: "Thịt lợn sấy chuẩn vị, ăn là ghiền.",
		image: "/products/lon-say.jpg",
		description: "Thịt lợn đen bản địa được nuôi thả tự nhiên, ướp gia vị truyền thống và sấy khô bằng củi. Miếng thịt săn chắc, đậm vị, thơm lừng mùi khói.",
		origin: "Mộc Châu, Sơn La",
		storage: "Bảo quản ngăn mát tủ lạnh 2-3 tháng. Ngăn đông 6 tháng.",
		cookingTips: "Ăn trực tiếp hoặc nướng, chiên giòn. Kết hợp với cơm lam, xôi nếp.",
		weight: "300g",
		weightOptions: [
			{weight: "250g", price: 380000},
			{weight: "500g", price: 720000},
			{weight: "1kg", price: 1380000}
		],
		inStock: true,
		blogContent: {
			intro: "Thịt lợn sấy Tây Bắc là món ăn truyền thống của đồng bào dân tộc vùng cao, được chế biến từ những con lợn đen bản địa nuôi thả tự nhiên trên núi. Hương vị đậm đà, thơm lừng mùi khói củi là điều khiến món ăn này trở thành đặc sản không thể thiếu của Tây Bắc.",
			sections: [
				{
					title: "Lợn đen bản địa - Nguồn nguyên liệu quý",
					content: "Lợn đen Tây Bắc được nuôi thả tự nhiên trên các sườn núi, ăn rau rừng và ngô nếp. Thịt lợn đen có đặc điểm săn chắc, ít mỡ nhưng rất thơm và ngọt tự nhiên. Đây là giống lợn bản địa quý hiếm, được bà con dân tộc gìn giữ qua nhiều thế hệ.",
					image: "/products/lon-say.jpg"
				},
				{
					title: "Ướp gia vị truyền thống",
					content: "Thịt lợn sau khi sơ chế được ướp với hỗn hợp gia vị đặc biệt gồm muối, tiêu rừng, mắc khén và các loại thảo mộc núi rừng. Quá trình ướp kéo dài 24-48 giờ để gia vị thấm đều vào từng thớ thịt, tạo nên hương vị đậm đà không thể nhầm lẫn.",
					image: "/products/lon-say.jpg"
				},
				{
					title: "Hun khói bằng củi rừng",
					content: "Thịt được treo trên gác bếp và hun khói bằng củi gỗ rừng trong 3-5 ngày. Khói từ củi gỗ tự nhiên không chỉ làm khô thịt mà còn tạo nên mùi thơm đặc trưng và giúp bảo quản thịt được lâu hơn. Đây là bí quyết gia truyền của đồng bào Tây Bắc.",
					image: "/products/lon-say.jpg"
				}
			]
		}
	},
	{
		id: "lap-xuong",
		name: "Lạp xưởng",
		price: 280000,
		currency: "VND",
		category: "Sấy",
		tag: "Thơm béo",
		shortDesc: "Lạp xưởng thơm, hợp nướng/chiên.",
		image: "/products/lap-xuong.jpg",
		description: "Lạp xưởng Tây Bắc làm từ thịt lợn đen, mỡ tỉ lệ vàng, ướp mắc khén và các loại gia vị núi rừng. Vị ngọt tự nhiên, thơm béo đặc trưng.",
		origin: "Sapa, Lào Cai",
		storage: "Bảo quản ngăn mát tủ lạnh 1-2 tháng. Ngăn đông 4 tháng.",
		cookingTips: "Hấp hoặc nướng than. Thái lát ăn kèm xôi, cơm nóng.",
		weight: "400g",
		weightOptions: [
			{weight: "300g", price: 210000},
			{weight: "500g", price: 340000},
			{weight: "1kg", price: 650000}
		],
		inStock: true,
		blogContent: {
			intro: "Lạp xưởng Tây Bắc là sự kết hợp hoàn hảo giữa công thức chế biến truyền thống và nguyên liệu tươi ngon từ vùng cao. Mỗi khúc lạp xưởng đều chứa đựng tâm huyết của người thợ làm và hương vị đặc trưng không nơi nào có được.",
			sections: [
				{
					title: "Chọn lọc nguyên liệu tươi ngon",
					content: "Lạp xưởng được làm từ thịt lợn đen bản địa với tỉ lệ nạc mỡ cân đối 7:3, đảm bảo độ ngậy béo mà không ngấy. Thịt được lựa chọn kỹ lưỡng, chỉ lấy phần thịt vai và thịt đùi - những phần có độ săn chắc và thơm ngon nhất.",
					image: "/products/lap-xuong.jpg"
				},
				{
					title: "Ướp gia vị mắc khén độc đáo",
					content: "Điểm đặc biệt của lạp xưởng Tây Bắc chính là hương vị mắc khén - loại hạt tiêu rừng đặc sản chỉ có ở vùng núi cao. Kết hợp với rượu ngô, tỏi, gừng và các loại thảo mộc, tạo nên hương thơm nồng nàn không thể quên.",
					image: "/products/lap-xuong.jpg"
				},
				{
					title: "Phơi sấy tự nhiên",
					content: "Lạp xưởng sau khi nhồi được treo phơi trong nhà gác bếp hoặc phơi nắng tự nhiên từ 5-7 ngày. Quá trình này giúp lạp xưởng khô dần, se lại và phát triển hương vị đặc trưng. Sản phẩm cuối cùng có màu đỏ hồng đẹp mắt, thơm lừng.",
					image: "/products/lap-xuong.jpg"
				}
			]
		}
	},
	{
		id: "ngo-tay-bac",
		name: "Ngô",
		price: 100000,
		currency: "VND",
		category: "Hạt",
		tag: "Bùi ngọt",
		shortDesc: "Ngô Tây Bắc bùi, thơm, dễ dùng.",
		image: "/products/ngo.jpg",
		description: "Ngô nếp vùng cao được trồng trên nương rẫy, thu hoạch đúng độ chín. Hạt ngô căng mẩy, bùi ngọt tự nhiên, thơm mùi đặc trưng.",
		origin: "Hà Giang",
		storage: "Bảo quản nơi khô ráo, thoáng mát. Tránh ánh nắng trực tiếp.",
		cookingTips: "Rang bơ, nấu chè, làm bánh ngô. Xay bột làm mèn mén.",
		weight: "1kg",
		weightOptions: [
			{weight: "500g", price: 55000},
			{weight: "1kg", price: 100000},
			{weight: "2kg", price: 190000}
		],
		inStock: true,
		blogContent: {
			intro: "Ngô nếp Tây Bắc là giống ngô bản địa quý hiếm, được trồng trên những nương rẫy dốc đứng ở độ cao trên 1000m. Khí hậu mát mẻ và đất đai màu mỡ của vùng cao tạo nên hạt ngô có độ dẻo, bùi và thơm đặc biệt.",
			sections: [
				{
					title: "Giống ngô nếp vùng cao",
					content: "Đây là giống ngô nếp được đồng bào dân tộc Tày, Mông gìn giữ qua nhiều thế hệ. Hạt ngô có màu trắng đục, nhỏ hơn ngô thường nhưng có độ dẻo và ngọt vượt trội. Mỗi bắp ngô được chăm sóc thủ công, không sử dụng thuốc trừ sâu hay phân bón hóa học.",
					image: "/products/ngo.jpg"
				},
				{
					title: "Canh tác trên nương rẫy",
					content: "Ngô được trồng theo phương pháp luân canh truyền thống trên các sườn núi. Đất nương rẫy giàu dinh dưỡng từ lớp mùn rừng, kết hợp với khí hậu mát mẻ quanh năm, tạo điều kiện lý tưởng cho ngô phát triển. Quá trình canh tác hoàn toàn thủ công, bảo vệ môi trường.",
					image: "/products/ngo.jpg"
				},
				{
					title: "Thu hoạch và sơ chế",
					content: "Ngô được thu hoạch khi hạt đã già, có độ cứng vừa phải. Sau khi bóc vỏ, ngô được phơi khô trên các gác bếp hoặc sân nhà. Quá trình phơi tự nhiên giúp ngô khô đều, giữ được hương thơm và có thể bảo quản lâu dài mà không cần chất bảo quản.",
					image: "/products/ngo.jpg"
				}
			]
		}
	},
	{
		id: "trau-say",
		name: "Thịt trâu gác bếp",
		price: 710000,
		currency: "VND",
		category: "Sấy",
		tag: "Hun khói",
		shortDesc: "Trâu sấy đậm hương, hợp làm quà.",
		image: "/products/trau-say.jpg",
		description: "Thịt trâu gác bếp - đặc sản nổi tiếng Tây Bắc. Thịt trâu tươi được tẩm ướp gia vị rồi hun khói trên bếp củi. Miếng thịt khô dẻo, đậm đà hương vị núi rừng.",
		origin: "Điện Biên",
		storage: "Bảo quản ngăn mát tủ lạnh 3-4 tháng. Ngăn đông 8 tháng.",
		cookingTips: "Xé sợi ăn trực tiếp với chanh, tỏi. Nướng hoặc hấp cách thủy.",
		weight: "250g",
		weightOptions: [
			{weight: "250g", price: 710000},
			{weight: "500g", price: 1380000},
			{weight: "1kg", price: 2700000}
		],
		inStock: true,
		blogContent: {
			intro: "Thịt trâu gác bếp là đặc sản nổi tiếng bậc nhất của Tây Bắc, mang trong mình hương vị hoang dã của núi rừng và văn hóa ẩm thực độc đáo của đồng bào dân tộc. Mỗi miếng thịt trâu đều là kết tinh của thiên nhiên và bàn tay khéo léo của con người.",
			sections: [
				{
					title: "Trâu vùng cao - Nguồn nguyên liệu đặc biệt",
					content: "Trâu được nuôi thả tự nhiên trên các đồng cỏ vùng cao Điện Biên, ăn cỏ tự nhiên và uống nước suối trong lành. Thịt trâu vùng cao có đặc điểm ít mỡ, thớ thịt săn chắc và có vị ngọt tự nhiên đặc trưng, khác biệt hoàn toàn với thịt trâu đồng bằng.",
					image: "/products/trau-say.jpg"
				},
				{
					title: "Bí quyết tẩm ướp gia truyền",
					content: "Thịt trâu được thái thành miếng mỏng vừa phải, sau đó tẩm ướp với hỗn hợp gia vị gồm muối, tiêu rừng, mắc khén, gừng và ớt khô. Mỗi gia đình có công thức riêng được truyền từ đời này sang đời khác, tạo nên hương vị độc đáo không thể sao chép.",
					image: "/products/trau-say.jpg"
				},
				{
					title: "Gác bếp - Nghệ thuật hun khói",
					content: "Thịt được treo trên gác bếp và hun khói liên tục trong 7-10 ngày. Củi dùng để hun là các loại gỗ rừng tự nhiên như gỗ nhãn, gỗ mít, tạo mùi thơm đặc trưng. Quá trình hun khói chậm rãi giúp thịt khô từ từ, giữ được độ dẻo và hương vị đậm đà.",
					image: "/products/trau-say.jpg"
				}
			]
		}
	},
];

export const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

export const getProductById = (id: string): Product | undefined => {
	return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
	if (category === 'Tất cả') return products;
	return products.filter(p => p.category === category);
};
