import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Modal, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setBikeFromApi } from '../redux/filterSlice';
import axios from 'axios';

export default function App() {
  const bikes = useSelector((state) => state.bikes);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null); // Sản phẩm được chọn

  // Lọc danh sách xe đạp
  const filteredBikes = filter === 'All' ? bikes : bikes.filter(bike => bike.type === filter);

  useEffect(() => {
    const fetchBikeFromApi = async () => {
      try {
        const response = await axios.get('https://6731a3ae7aaf2a9aff1152c3.mockapi.io/bikes');
        dispatch(setBikeFromApi(response.data));
      } catch (error) {
        console.log("Error fetching bikes: ", error);
      }
    };

    fetchBikeFromApi();
  }, [dispatch]);

  const handleBikePress = (bike) => {
    setSelectedBike(bike); // Lưu sản phẩm được chọn
    setModalVisible(true); // Hiển thị modal
  };

  const renderBike = ({ item }) => (
    <TouchableOpacity style={styles.bikeCard} onPress={() => handleBikePress(item)}>
      <Image source={{ uri: item.image }} style={styles.bikeImage} />
      <Text style={styles.bikeName}>{item.name}</Text>
      <Text style={styles.bikePrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The World's Best Bike</Text>

      {/* Bộ lọc */}
      <View style={styles.filterContainer}>
        {['All', 'Roadbike', 'Mountain'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.filterButton, filter === type && styles.activeButton]}
            onPress={() => setFilter(type)}
          >
            <Text style={styles.filterText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách xe đạp */}
      <FlatList
        data={filteredBikes}
        renderItem={renderBike}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={[styles.bikeList, { flexGrow: 1 }]}
        showsVerticalScrollIndicator={true} // Bật cuộn dọc
      />

      {/* Modal chi tiết sản phẩm */}
      {selectedBike && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Hình ảnh sản phẩm */}
              <Image source={{ uri: selectedBike.image }} style={styles.modalImage} />

              {/* Tên sản phẩm */}
              <Text style={styles.modalTitle}>{selectedBike.name}</Text>

              {/* Thông tin giá cả và giảm giá */}
              <View style={styles.priceContainer}>
                <Text style={styles.modalDiscount}>{selectedBike.discount || 'No Discount'}</Text>
                <Text style={styles.modalOriginalPrice}>${selectedBike.originalPrice || 'N/A'}</Text>
                <Text style={styles.modalPrice}>${selectedBike.price}</Text>
              </View>

              {/* Mô tả sản phẩm */}
              <Text style={styles.modalDescription}>{selectedBike.description || 'No description available.'}</Text>

              {/* Nút thêm vào giỏ hàng */}
              <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>Add to cart</Text>
              </TouchableOpacity>

              {/* Nút đóng Modal */}
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E94E4F',
    textAlign: 'center',
    marginVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#FFE6E6',
    borderColor: '#E94E4F',
  },
  filterText: {
    fontSize: 16,
    color: '#E94E4F',
  },
  bikeList: {
    justifyContent: 'space-between',
  },
  bikeCard: {
    flex: 1,
    maxWidth: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    margin: '1%',
    alignItems: 'center',
  },
  bikeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  bikeName: {
    fontSize: 16,
    marginVertical: 5,
  },
  bikePrice: {
    fontSize: 18,
    color: '#E94E4F',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  modalDiscount: {
    fontSize: 14,
    color: '#E94E4F',
    marginRight: 10,
    fontWeight: 'bold',
  },
  modalOriginalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  modalPrice: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  addToCartButton: {
    backgroundColor: '#E94E4F',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
