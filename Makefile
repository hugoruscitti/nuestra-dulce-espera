all:
	@echo "Comandos:"
	@echo ""
	@echo "  make splash"
	@echo ""

splash:
	npx pwa-asset-generator icono.png public -m manifest.json --padding "calc(50vh - 25%) calc(50vw - 25%)" -b "linear-gradient(135deg, #ededff, #00d4ff)" -q 100 -i ./index.html --favicon
