package com.oam.utils.log4j;

public final class PrettyFormatter extends AbstractPrettyFormatter {

    @SuppressWarnings("WeakerAccess") // Used by PluginFactory
    public PrettyFormatter(Appendable out) {
        super(out);
    }

    @Override
    protected void printlnLog(String logEntry) {
        out().println(logEntry);
    }

    @Override
    void finishReport() {
        out().close();
    }

}
