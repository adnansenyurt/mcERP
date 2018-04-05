package com.mobilechip.erp.service.impl;

import com.mobilechip.erp.service.PriceRangeService;
import com.mobilechip.erp.domain.PriceRange;
import com.mobilechip.erp.repository.PriceRangeRepository;
import com.mobilechip.erp.service.dto.PriceRangeDTO;
import com.mobilechip.erp.service.mapper.PriceRangeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing PriceRange.
 */
@Service
@Transactional
public class PriceRangeServiceImpl implements PriceRangeService {

    private final Logger log = LoggerFactory.getLogger(PriceRangeServiceImpl.class);

    private final PriceRangeRepository priceRangeRepository;

    private final PriceRangeMapper priceRangeMapper;

    public PriceRangeServiceImpl(PriceRangeRepository priceRangeRepository, PriceRangeMapper priceRangeMapper) {
        this.priceRangeRepository = priceRangeRepository;
        this.priceRangeMapper = priceRangeMapper;
    }

    /**
     * Save a priceRange.
     *
     * @param priceRangeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PriceRangeDTO save(PriceRangeDTO priceRangeDTO) {
        log.debug("Request to save PriceRange : {}", priceRangeDTO);
        PriceRange priceRange = priceRangeMapper.toEntity(priceRangeDTO);
        priceRange = priceRangeRepository.save(priceRange);
        return priceRangeMapper.toDto(priceRange);
    }

    /**
     * Get all the priceRanges.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PriceRangeDTO> findAll() {
        log.debug("Request to get all PriceRanges");
        return priceRangeRepository.findAll().stream()
            .map(priceRangeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one priceRange by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PriceRangeDTO findOne(Long id) {
        log.debug("Request to get PriceRange : {}", id);
        PriceRange priceRange = priceRangeRepository.findOne(id);
        return priceRangeMapper.toDto(priceRange);
    }

    /**
     * Delete the priceRange by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PriceRange : {}", id);
        priceRangeRepository.delete(id);
    }
}
