package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.BillOfMaterialsService;
import com.mobilechip.erp.domain.BillOfMaterials;
import com.mobilechip.erp.repository.BillOfMaterialsRepository;
import com.mobilechip.erp.service.dto.BillOfMaterialsDTO;
import com.mobilechip.erp.service.mapper.BillOfMaterialsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing BillOfMaterials.
 */
@Service
@Transactional
public class BillOfMaterialsServiceImpl implements BillOfMaterialsService {

    private final Logger log = LoggerFactory.getLogger(BillOfMaterialsServiceImpl.class);

    private final BillOfMaterialsRepository billOfMaterialsRepository;

    private final BillOfMaterialsMapper billOfMaterialsMapper;

    public BillOfMaterialsServiceImpl(BillOfMaterialsRepository billOfMaterialsRepository, BillOfMaterialsMapper billOfMaterialsMapper) {
        this.billOfMaterialsRepository = billOfMaterialsRepository;
        this.billOfMaterialsMapper = billOfMaterialsMapper;
    }

    /**
     * Save a billOfMaterials.
     *
     * @param billOfMaterialsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BillOfMaterialsDTO save(BillOfMaterialsDTO billOfMaterialsDTO) {
        log.debug("Request to save BillOfMaterials : {}", billOfMaterialsDTO);
        BillOfMaterials billOfMaterials = billOfMaterialsMapper.toEntity(billOfMaterialsDTO);
        billOfMaterials = billOfMaterialsRepository.save(billOfMaterials);
        return billOfMaterialsMapper.toDto(billOfMaterials);
    }

    /**
     * Get all the billOfMaterials.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BillOfMaterialsDTO> findAll() {
        log.debug("Request to get all BillOfMaterials");
        return billOfMaterialsRepository.findAll().stream()
            .map(billOfMaterialsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one billOfMaterials by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BillOfMaterialsDTO findOne(Long id) {
        log.debug("Request to get BillOfMaterials : {}", id);
        BillOfMaterials billOfMaterials = billOfMaterialsRepository.findOne(id);
        return billOfMaterialsMapper.toDto(billOfMaterials);
    }

    /**
     * Delete the billOfMaterials by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BillOfMaterials : {}", id);
        billOfMaterialsRepository.delete(id);
    }
}
