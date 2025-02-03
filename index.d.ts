import apiClient from "./lib/api-client.mjs";

export interface Station {
    id: string;
    name: string;
    url: string;
    favicon?: string;
    country?: string;
    language?: string;
}

export interface SearchOptions {
    by?: string;
    searchterm?: string;
    order?: string;
    reverse?: boolean;
    offset?: number;
    limit?: number;
}

export interface CategoryFilter {
    country?: string;
    searchterm?: string;
    order?: string;
    reverse?: boolean;
    hidebroken?: boolean;
}

export interface RadioBrowserAPI {
    service_url: string;
    setUserAgent: (userAgent: string) => void;
    getRandomHost: () => Promise<string>;
    getCategory: (category: string, filter?: CategoryFilter) => Promise<any>;
    getStations: (filter?: SearchOptions) => Promise<Station[]>;
    getChecks: (stationuuid: string, seconds?: number) => Promise<any>;
    getChecksteps: (uuids: string[]) => Promise<any>;
    getClicks: (stationuuid: string, seconds?: number) => Promise<any>;
    clickStation: (stationuuid: string) => Promise<any>;
    searchStations: (params: SearchOptions) => Promise<Station[]>;
    voteStation: (stationuuid: string) => Promise<any>;
    deleteStation: (stationuuid: string) => Promise<any>;
    undeleteStation: (stationuuid: string) => Promise<any>;
    addStation: (params: any) => Promise<any>;
    editStation: (stationuuid: string, params: any) => Promise<any>;
    getServerStats: () => Promise<any>;
    getServerMirrors: () => Promise<any>;
    getServerConfig: () => Promise<any>;
    filter_by_types: string[];
    category_types: string[];
}

const RadioBrowser: RadioBrowserAPI = {
    get service_url() {
        return apiClient.service_url;
    },
    set service_url(url: string) {
        apiClient.service_url = url;
    },
    setUserAgent: apiClient.setUserAgent,
    getRandomHost: apiClient.getRandomHost,
    getCategory: (category, filter = {}) => {
        return apiClient.request(category, filter);
    },
    getStations: (filter = {}) => {
        return apiClient.request("stations", filter);
    },
    getChecks: (stationuuid, seconds = 0) => {
        return apiClient.request("checks/" + stationuuid, seconds ? { seconds } : {});
    },
    getChecksteps: (uuids) => {
        return apiClient.request("checksteps", { uuids: uuids.join(",") });
    },
    getClicks: (stationuuid, seconds = 0) => {
        return apiClient.request("clicks/" + stationuuid, seconds ? { seconds } : {});
    },
    clickStation: (stationuuid) => {
        return apiClient.request("url/" + stationuuid);
    },
    searchStations: (params) => {
        return apiClient.request("stations/search", params);
    },
    voteStation: (stationuuid) => {
        return apiClient.request("vote/" + stationuuid);
    },
    deleteStation: (stationuuid) => {
        return apiClient.request("delete/" + encodeURI(stationuuid));
    },
    undeleteStation: (stationuuid) => {
        return apiClient.request("undelete/" + stationuuid);
    },
    addStation: (params) => {
        return apiClient.request("add", params);
    },
    editStation: (stationuuid, params) => {
        return apiClient.request("edit/" + stationuuid, params);
    },
    getServerStats: () => {
        return apiClient.request("stats");
    },
    getServerMirrors: () => {
        return apiClient.request("servers");
    },
    getServerConfig: () => {
        return apiClient.request("config");
    },
    get filter_by_types() {
        return ["uuid", "name", "nameexact", "codec", "codecexact", "country", "countryexact", "countrycodeexact", "state", "stateexact", "language", "languageexact", "tag", "tagexact", "url", "topclick", "topvote", "lastclick", "lastchange", "improvable", "broken"];
    },
    get category_types() {
        return ["countries", "countrycodes", "codecs", "states", "languages", "tags"];
    },
};

export default RadioBrowser;