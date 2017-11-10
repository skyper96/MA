package com.example.filip.clops;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.EditText;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private ListView listView;
    private List<Shop> shopList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initializeList();
    }

    public void btnLoginOnClick (View v){
        setContentView(R.layout.activity_home);

        listView = (ListView) findViewById(R.id.listView);

        ArrayAdapter<Shop> arrayAdapter = new ArrayAdapter<Shop>(
                this,
                android.R.layout.simple_list_item_1,
                shopList );

        listView.setAdapter(arrayAdapter);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l){
                String currentItem = listView.getItemAtPosition(i).toString();

                setContentView(R.layout.activity_manage);

                String[] entities = currentItem.split("\n");

                EditText shopName = (EditText) findViewById(R.id.editTextShopName);
                EditText shopAddress = (EditText) findViewById(R.id.editTextShopAddress);
                EditText shopEmail = (EditText) findViewById(R.id.editTextShopEmail);
                EditText shopNetIncome = (EditText) findViewById(R.id.editTextShopNetIncome);

                shopName.setText(entities[0]);
                shopName.setEnabled(false);
                shopAddress.setText(entities[1]);
                shopEmail.setText(entities[2]);
                shopNetIncome.setText(entities[3]);
            }
        });
    }

    public void btnRequestAddOnClick (View v){
        EditText shopName = (EditText) findViewById(R.id.editTextShopName);
        EditText shopAddress = (EditText) findViewById(R.id.editTextShopAddress);
        EditText shopEmail = (EditText) findViewById(R.id.editTextShopEmail);
        EditText shopNetIncome = (EditText) findViewById(R.id.editTextShopNetIncome);

        Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts(
                "mailto","filipmobile2017@gmail.com", null));
        emailIntent.putExtra(Intent.EXTRA_SUBJECT, "Request to add a new shop");
        emailIntent.putExtra(Intent.EXTRA_TEXT, "Hi, I would like to add the shop: \"" + shopName.getText().toString()
                + "\" with the location at: \"" + shopAddress.getText().toString() + "\", the email: \""
                + shopEmail.getText().toString() + "\" and the net income: \"" + shopNetIncome.getText().toString() +
                "\"\n\nBest Regards"
        );
        startActivity(Intent.createChooser(emailIntent, "Send email..."));
    }

    public void btnEditOnClick (View v){
        EditText shopName = (EditText) findViewById(R.id.editTextShopName);
        EditText shopAddress = (EditText) findViewById(R.id.editTextShopAddress);
        EditText shopEmail = (EditText) findViewById(R.id.editTextShopEmail);
        EditText shopNetIncome = (EditText) findViewById(R.id.editTextShopNetIncome);

        for (Shop shop : shopList) {
            System.out.println(shop.getName());
            System.out.println(shopName.getText().toString());
            System.out.println();
            if(shop.getName().equals(shopName.getText().toString())){
                shop.setAddress(shopAddress.getText().toString());
                shop.setEmail(shopEmail.getText().toString());
                shop.setNetIncome(shopNetIncome.getText().toString());
            }
        }

        btnLoginOnClick(v);
    }

    private void initializeList(){
        shopList = new ArrayList<Shop>();
        Shop shop1 = new Shop();
        shop1.setName("Auchan");
        shop1.setAddress("Alexandru Vaida Voevod nr.53");
        shop1.setEmail("auchan@auchan.com");
        shop1.setNetIncome("154m");

        Shop shop2 = new Shop();
        shop2.setName("Profi");
        shop2.setAddress("Decebal nr.21");
        shop2.setEmail("cluj@profi.ro");
        shop2.setNetIncome("70m");

        shopList.add(shop1);
        shopList.add(shop2);
    }
}
