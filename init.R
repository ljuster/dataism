# init.R
#
# Example R code to install packages if not already installed
#

my_packages = c("Rserve")

install_if_missing = function(p) {
  if (p %in% rownames(installed.packages()) == FALSE) {
    install.packages(p)
  }
}

invisible(sapply(my_packages, install_if_missing))

require('Rserve')

# get the port allowed
port <- Sys.getenv('PORT')

# run Rserve in process
run.Rserve(debug = TRUE, port, args = NULL, config.file = "./rserve.conf")