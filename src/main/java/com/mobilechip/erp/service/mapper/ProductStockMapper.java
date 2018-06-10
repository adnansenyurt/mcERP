package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.ProductStockDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProductStock and its DTO ProductStockDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface ProductStockMapper extends EntityMapper<ProductStockDTO, ProductStock> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    ProductStockDTO toDto(ProductStock productStock);

    @Mapping(source = "productId", target = "product")
    ProductStock toEntity(ProductStockDTO productStockDTO);

    default ProductStock fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductStock productStock = new ProductStock();
        productStock.setId(id);
        return productStock;
    }
}
