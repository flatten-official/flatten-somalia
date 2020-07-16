# Logging Utility

This package allows for logging with Winston (and stackdriver in staging/production environments).

Logs use the standard GCP LogEntry [severity levels](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity).

Log statements with severity `debug` aren't logged in production.