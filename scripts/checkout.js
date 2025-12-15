 const productList = document.getElementById('product-list');
        const subtotalElement = document.getElementById('subtotal');
        const totalElement = document.getElementById('total');

        // Lấy dữ liệu từ localStorage
        let cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];

        // Hiển thị danh sách sản phẩm
        function renderProducts() {
            productList.innerHTML = '';
            let subtotal = 0;

            cartItem.forEach(item => {
                subtotal += item.price * item.quantity;
                const productElement = `
                    <div class="product-item">
                        <div class="product-item__img">
                            <img src="${item.imgSrc}" alt="${item.name}">
                        </div>
                        <div class="product-item__name">${item.name}</div>
                        <div class="product-item__price">${(item.price * item.quantity).toLocaleString('vi-VN')}đ</div>
                        <div class="product-item__quantity">x${item.quantity}</div>
                    </div>
                `;
                productList.insertAdjacentHTML('beforeend', productElement);
            });

            // Cập nhật tổng tiền
            subtotalElement.innerText = subtotal.toLocaleString('vi-VN') + 'đ';
            const total = subtotal + 30000; // Phí vận chuyển cố định
            totalElement.innerText = total.toLocaleString('vi-VN') + 'đ';
        }

        // Xử lý đặt hàng
        function placeOrder() {
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

            if (!name || !phone || !address) {
                alert('Vui lòng điền đầy đủ thông tin địa chỉ!');
                return;
            }

            alert(`Đơn hàng đã được đặt thành công!\nThông tin nhận hàng:\n- Họ và tên: ${name}\n- Số điện thoại: ${phone}\n- Địa chỉ: ${address}\nPhương thức thanh toán: ${paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Ví ShopeePay'}`);
            localStorage.removeItem('cartItem');
            window.location.href='thankyou.page.html'// Chuyển hướng sang trang cảm ơn
        }

        // Gọi hàm render khi trang tải
        renderProducts();