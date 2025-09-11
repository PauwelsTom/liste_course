from playwright.sync_api import Page, expect
from Utils.Shortcuts import *
from Utils.TestRunner import TestRunner


def test_multiple_products(page: Page) -> None:
    t = TestRunner()
    t.run(page, instructions, "test_multiple_products")


def instructions(page, site, logger) -> None:
    page.goto(site)
    expect(page.locator("#currentTotalSpan")).to_be_visible()
    logger.log("Connexion à la page avec succès")

    total = 0
    total += click_product(page, logger, "#Simple", total)
    total += click_product(page, logger, "#Double", total)
    total += click_product(page, logger, "#Triple", total)
    
