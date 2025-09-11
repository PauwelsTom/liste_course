from playwright.sync_api import Page, expect
from Utils.Shortcuts import *
from Utils.TestRunner import TestRunner


def test_connect_page(page: Page) -> None:
    t = TestRunner()
    t.run(page, instructions, "test_connect_page")


def instructions(page, site, logger) -> None:
    page.goto(site)
    expect(page.locator("#currentTotalSpan")).to_be_visible()
    logger.log("Connexion à la page avec succès")
