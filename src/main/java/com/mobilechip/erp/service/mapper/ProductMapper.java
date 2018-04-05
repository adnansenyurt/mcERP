package com.mobilechip.erp.service.mapper;

import com.mobilechip.erp.domain.*;
import com.mobilechip.erp.service.dto.ProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Product and its DTO ProductDTO.
 */
@Mapper(componentModel = "spring", uses = {OpportunityMapper.class, ProductStockMapper.class})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {

    @Mapping(source = "opportunity.id", target = "opportunityId")
    @Mapping(source = "productStock.id", target = "productStockId")
    ProductDTO toDto(Product product);

    @Mapping(source = "opportunityId", target = "opportunity")
    @Mapping(source = "productStockId", target = "productStock")
    Product toEntity(ProductDTO productDTO);

    default Product fromId(Long id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
