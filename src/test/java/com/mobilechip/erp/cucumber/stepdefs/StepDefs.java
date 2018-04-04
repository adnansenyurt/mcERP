package com.mobilechip.erp.cucumber.stepdefs;

import com.mobilechip.erp.McErpApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = McErpApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
