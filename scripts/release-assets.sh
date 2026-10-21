#!/bin/sh
# Понятные имена установщиков в релизе: система и процессор вместо aarch64/amd64.
# Запуск: scripts/release-assets.sh v0.2.0 (нужен gh с доступом к репозиторию).
set -eu
tag="$1"
v="${tag#v}"
repo="${GITHUB_REPOSITORY:-ShevlukVasiliy/Hoard-English}"

name_for() {
  case "$1" in
    *_aarch64.dmg) echo "Hoard-$v-macOS-Apple-Silicon.dmg" ;;
    *_x64.dmg) echo "Hoard-$v-macOS-Intel.dmg" ;;
    *aarch64.app.tar.gz) echo "Hoard-$v-macOS-Apple-Silicon.app.tar.gz" ;;
    *x64.app.tar.gz) echo "Hoard-$v-macOS-Intel.app.tar.gz" ;;
    *-setup.exe) echo "Hoard-$v-Windows-Setup.exe" ;;
    *.msi) echo "Hoard-$v-Windows.msi" ;;
    *.AppImage) echo "Hoard-$v-Linux.AppImage" ;;
    *.deb) echo "Hoard-$v-Linux.deb" ;;
    *.rpm) echo "Hoard-$v-Linux.rpm" ;;
    *) echo "" ;;
  esac
}

# по списку, а не по тегу: черновик релиза по тегу не находится
gh api "repos/$repo/releases" --jq ".[] | select(.tag_name == \"$tag\") | .assets[] | \"\\(.id) \\(.name)\"" | while read -r id name; do
  new=$(name_for "$name")
  if [ -n "$new" ] && [ "$new" != "$name" ]; then
    gh api -X PATCH "repos/$repo/releases/assets/$id" -f name="$new" --jq '"  \(.name)"'
  fi
done
