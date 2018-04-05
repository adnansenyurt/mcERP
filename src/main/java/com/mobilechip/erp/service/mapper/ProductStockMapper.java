package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.ProductStockDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProductStock and its DTO ProductStockDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProductStockMapper extends EntityMapper<ProductStockDTO, ProductStock> {


    @Mapping(target = "products", ignore = true)
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
