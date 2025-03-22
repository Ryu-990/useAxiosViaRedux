import Axios, { AxiosResponse } from "axios";
import { Product } from "../types";

// DataType インターフェースの定義
interface DataType {
  id?: number;
  [key: string]: any;
}

export class RestDataSource {
  private BASE_URL: string;
  private handleError: (error: string) => void;

  constructor(base_url: string, errorCallback: (error: string) => void) {
    this.BASE_URL = base_url;
    this.handleError = errorCallback;

    // Axiosのデフォルト設定
    Axios.defaults.headers.common['Accept'] = 'application/json';
    Axios.defaults.headers.common['Content-Type'] = 'application/json';
  }

  async GetData(): Promise<any[]> {
    console.log("Requesting URL:", this.BASE_URL);
    return await this.SendRequest("get", this.BASE_URL);
  }

  async GetOne(id: string | number): Promise<Product> {
    return await this.SendRequest("get", `${this.BASE_URL}/${id}`);
  }

  async Store(data: DataType, p0: (responseData: any) => void): Promise<any> {
    // 既存のデータを取得して最大のidを見つける
    const products = await this.GetData();
    const maxId = products.reduce(
      (max: number, p: Product) => Math.max(max, parseInt(String(p.id ?? "0"), 10)),
      0
    );
    const newId = (maxId + 1).toString(); // 新しいidを文字列として設定

    // 新しい商品データにidを設定
    const newData = {
      ...data,
      id: newId, // idを文字列として設定
    };

    // 新しい商品を保存
    const response = await this.SendRequest("post", this.BASE_URL, newData);

    // コールバック関数を呼び出し
    if (p0) {
      p0(response);
    }

    return response;
  }


  async Update(data: DataType, p0: (responseData: any) => void): Promise<any> {
    const response = await this.SendRequest("put", `${this.BASE_URL}/${data.id}`, data);
    if (p0) {
      p0(response); // レスポンスをコールバック関数に渡して実行
    }
    return response;
  }

  async Delete(data: DataType, p0: () => void): Promise<any> {
    try {
      // Axiosを使ってDELETEリクエストを送信
      const response = await Axios.delete(`${this.BASE_URL}/${data.id}`);

      // 成功時の処理
      console.log("削除成功:", response.data);

      // 削除後にコールバックを呼び出す
      p0();
      /**削除処理が成功した場合に渡されたコールバック関数 p0 を呼び出すようにしました。
       * このコールバックは削除後に実行されるべき処理（状態更新やナビゲーション）を行います。 */
      return response.data;
    } catch (error: unknown) {
      // エラーハンドリング
      if (error instanceof Error) {
        console.error("削除リクエスト失敗:", error.message);
        throw new Error(`削除に失敗しました: ${error.message}`);
      } else {
        console.error("削除リクエスト失敗: 不明なエラー");
        throw new Error(`削除に失敗しました: 不明なエラー`);
      }
    }
  }


  private async SendRequest(
    method: string,
    url: string,
    data?: DataType
  ): Promise<any> {
    try {
      console.log(`Sending ${method} request to: ${url}`); // デバッグ用
      const response: AxiosResponse = await Axios.request({
        method: method,
        url: url,
        data: data,
        timeout: 5000,
        withCredentials: false,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err: any) {
      console.error("Request failed:", err); // デバッグ用
      this.handleError(`Operation Failed: ${err.message || 'Network Error'}`);
      throw err;
    }
  }
}
