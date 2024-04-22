{pkgs}: {
  deps = [
    pkgs.openssl.out
		pkgs.nodePackages.yarn
		pkgs.openssl
	];
}
