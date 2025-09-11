from playwright.sync_api import Page, expect
from Utils.Shortcuts import *
from Utils.TestRunner import TestRunner


def test_add_product(page: Page) -> None:
    t = TestRunner()
    t.run(page, instructions, "test_add_product")


def instructions(page, site, logger) -> None:
    page.goto(site)
    expect(page.locator("#currentTotalSpan")).to_be_visible()
    logger.log("Connexion à la page avec succès")

    elt = page.locator("#Simple")
    elt.click()
    expect(elt).to_have_class("AjoutSelected")
    prix = get_price(elt.text_content())
    expect(page.locator("#currentTotalSpan")).to_contain_text(str(prix))
    logger.log("Ajout d'un produit avec succès")
